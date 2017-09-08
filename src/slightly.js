const mergeRefs = (a, b) => {
  for (const name in b) {
    if (name in a) {
      if (Array.isArray(a[name]) && Array.isArray(b[name])) {
        a[name].push(...b[name])
        continue
      }
      throw new Error(`Multiple references with same name: '${name}'`)
    }
    a[name] = b[name]
  }
}

const parseRef = ref => {
  const names = ref.trim().split(',')
  const refProps = []

  for (let name of names) {
    name = name.trim()
    if (name.lastIndexOf('[]') === name.length - 2) {
      refProps.push({name: name.substr(0, name.length - 2), list: true})
    } else {
      refProps.push({name, list: false})
    }
  }
  return refProps
}

export default class Slightly {
  constructor (el, options = null) {
    this.$el = el
    this.$options = Object.assign({}, options).freeze()
    this.$components = Object.assign({}, this.$options.components)
    this.$refs = {}
    this.$views = []

    // init

    this.$composeDom(this.$el)
    this.$remount(this.$el)
  }

  $composeDom (el) {}

  $remount (el) {
    const {refs, views} = this._$traverse(el)
    mergeRefs(this.$refs, refs)
    this.$views.push(...views)
  }

  _$traverse (el) {
    const views = []
    const refs = {}
    const children = [...el.children]

    for (const child of children) {
      if (child.hasAttribute('s-ignore')) {
        continue
      }

      let view

      // create view

      if (child.hasAttribute('s-is')) {
        const name = child.getAttribute('s-is')
        const component = this._$findComponent(name)

        if (!component) {
          throw new Error(`No such component: ${name}`)
        }

        view = new component(child, Object.assign({}, this.$options, {_parent: this}))
        views.push(view)
      }

      // assign refs

      if (child.hasAttribute('s-ref')) {
        const refProps = parseRef(child.getAttribute('s-ref'))

        for (const {name, list} of refProps) {
          if (list && !(name in refs)) {
            refs[name] = []
          }
          if (list) {
            refs[name].push(view || child)
          } else {
            if (name in refs) {
              throw new Error(`Multiple references with same name: '${name}'`)
            }
            refs[name] = view || child
          }
        }
      }

      // proceed descendants

      if (view) {
        continue
      }
      if (child.hasAttribute('s-ignore-children')) {
        continue
      }

      const {refs: _refs, views: _views} = this._$traverse(child)
      mergeRefs(refs, _refs)
      views.push(..._views)
    }

    return {refs, views}
  }

  _$findComponent (name) {
    let view = this

    while (view) {
      if (name in view.$components) {
        return view.$components[name]
      }
      view = this.$options._parent
    }
    return null
  }
}
