const materiales = require("./config/server"); 

require("./config/database"); 
materiales.listen(materiales.get("port"), ()=> {
    console.log('Server in running on port:', materiales.get('port'))
});