module.exports = {
    db_config: {
        host: '127.0.0.1',
        user: 'root',
        password: 'yasginiwa',
        database: 'dbbin',
        port: 3306
    },
    jwt_config: {
        secretOrKey: 'yasginiwa12#$',
        expiresIn: 3600
    },
    baseURL: {
        private: '/api/v1/private',
        public: '/api/v1/public'
    },
    upload_config: {
        
    },
    weapp_config: {
        appid: '',
        secret: ''
    },
    pncard_config: {
        token: 'HGPINConsult',
        method: 'Consult',
        signtype: 'md5',
        shopid: 5,
        signKey: 'MLIPaySign2019f790364ebce149408b05601ef580e226IPaySign2100',
        charset: 'gbk'
    }
}