var React = require('react')

// USAGE:
// used in useFetch
// const { isLoading, data } = Hooks.usePromise(promiseFn)

function flattenInput () {
  var res = []
  for (var i = 0; i < arguments.length; i++) {
    var input = arguments[i]
    if (input instanceof Array) {
      for (var j = 0; j < input.length; j++) {
        res = res.concat(flattenInput(input[j]))
      }
    } else if (typeof URL !== 'undefined' && input instanceof URL) {
      res = res.concat(input.toJSON())
    } else if (input instanceof Object) {
      var keys = Object.keys(input)
      for (var k = 0; k < keys.length; k++) {
        var key = keys[k]
        res = res.concat([key]).concat(flattenInput(input[key]))
      }
    } else {
      res = res.concat(input)
    }
  }
  return res
}

function usePromise (callFunction) {
  var inputs = Array.prototype.slice.call(arguments, [1])
  var state = React.useState({
    isLoading: !!callFunction
  })

  React.useEffect(function () {
    if (!callFunction) {
      return
    }
    !state[0].isLoading && state[1]({ data: state[0].data, isLoading: true })
    callFunction.apply(null, inputs)
      .then(function (data) {
        state[1]({
          data: data,
          isLoading: false
        })
      })
      .catch(function (error) {
        state[1]({
          error: error,
          isLoading: false
        })
      })
  }, flattenInput(inputs))

  return state[0]
}

module.exports = usePromise
