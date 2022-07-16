module.exports={
    env:{
        browser: true,
        node:true,
        es202:true
    },
    extends:['airbnb-base'],
    parserOptions:{
        sourceType: 'module',
        ecmaVersion:11,
    },
    rules:{
        'no-console':0,
    }
}