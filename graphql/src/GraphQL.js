import { gql, useQuery, useMutation, useLazyQuery, useApolloClient } from '@apollo/client';

let schema = {};
let update_by_field = null;       // audit field to inject
let update_by = null;             // audit value to inject

const wrapMutation = (fn, table) => {
  return data => {
    // allow client to include user "updated_by" value with each call
    if(update_by_field && schema[table].indexOf(update_by_field) > -1){
      data[update_by_field] = update_by;
    }
    // don't allow arrays or objects, remove pesky graphql artifacts
    let copy = {};
    for (var x in data) {
      if (data.hasOwnProperty(x) && x !== '__typename') {
        if(['object','function'].indexOf(typeof data[x]) === -1 || data[x] === null){
          copy[x] = data[x];
        }
      }
    }
    return fn({ variables: { input: copy}})
  }
}

const GraphQL = {
  /*
    configure module
   */
  config: (params) => {
    if(params.schema){
      schema = params.schema;
    }
    update_by_field = params.update_by_field || null;
    update_by = params.update_by;
  },

  schema: () => schema,
  set_schema: s => schema = s,
  /*
    returns object:
      {
        ready:    [boolean] (query completed)
        loading:  [boolean]
        error:    [string]
        data:     [array] - results
        (and more)
      }
   */
  useGraphQuery: (query, config = {}) => {
    const qryType = config.lazy ? useLazyQuery : useQuery
    const { networkOnly = false, skip = false } = config;
    let result = qryType(gql`${query}`, {
      skip,
      fetchPolicy: networkOnly ? 'network-only' : 'cache-first',
      variables: config.variables || null
    });
    result.ready = true;
    if(!result.loading && !result.error){
      return result;
    }
    result.ready = false;
    if(result.error){
      console.error(result.error);
    }
    return result; // contains
  },

  // graphql helpers
  useSave: (table, clear_cache) => {
    const [createMutation] = useMutation(gql`
      mutation update_${table}($input: ${table}Input!) {
        create${table}(input: $input)
      }
    `);
    const insert = wrapMutation(createMutation, table);

    const [updateMutation] = useMutation(gql`
      mutation update_${table}($input: ${table}Input!) {
        update${table}(input: $input){
          ${schema[table]}
        }
      }
    `);
    const update = wrapMutation(updateMutation, table);
    const client = clear_cache ? useApolloClient() : null;
    let cache_buster = clear_cache ?
    (r) => {
      // expecting array or string
      const arr = typeof clear_cache === 'string' ? clear_cache.split(',') : clear_cache;
      arr.forEach(t => {
        // console.log('BUSTING',t);
        client.cache.evict({
          id: 'ROOT_QUERY',
          fieldName: t
        })
      });
      return r; // pass through values
    }
    :
    r => r // pass through values, do nothing
    return async (values, is_insert = false) => {
      if(!values) return null;
      if(is_insert){
        return await insert(values).then(({ data }) => data).then(cache_buster)
      }
      return await update(values).then(({ data }) => {
        return data[`update${table}`];
      }).then(cache_buster)
    }
  },

  useDelete: table => {
    const [deleteMutation] = useMutation(gql`
      mutation delete_${table}($input: ${table}Input!) {
        delete${table}(input: $input)
      }
    `);
    return data => deleteMutation({ variables: { input: data }});
  },

  useSaveDelete: (table, clear_cache) => {
    const doDelete = GraphQL.useDelete(table);
    const doSave = GraphQL.useSave(table, clear_cache)
    return [doSave, doDelete];
  },

  // to bypass the `hooks in components only` issue, get handle first
  useClient: () => useApolloClient(),
  // then pass handle into wrapper
  query: (client, query, config = {}) => {
    const { networkOnly = false } = config;
    return client.query({
      query:gql`${query}`,
      fetchPolicy: networkOnly ? 'network-only' : 'cache-first',
      variables: config.variables || null
    })
  },

  useGraphPurge: () => {
    const client = useApolloClient();
    return query_key => {
      client.cache.evict({
          id: 'ROOT_QUERY',
          fieldName: query_key
        })
    }
  }
}

export default GraphQL;
