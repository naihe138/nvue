const context = require.context('../', true, /views\/foo\/router\.js$/)

const ROUTERS = context.keys().reduce((c, i) => c.concat(context(i).default), [])

export default ROUTERS
