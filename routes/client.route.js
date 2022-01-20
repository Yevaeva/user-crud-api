const Response = require('../models/Response');
const ClientSrv = require('../services/client.srv');

module.exports = (app, models) => {
    const clientSrv = new ClientSrv(models.Client);
    
    app.get('/users', async (req, res) => {
        const srvResp = await clientSrv.getClients();
        if (srvResp.hasError)
            return res
            .status(404)
            .send(Response.constructResponseErrModel(srvResp.error.code || 404, srvResp.error.message));
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
    
    app.get('/api/client/:id', async (req, res) => {
        const {id} = req.params;
        const srvResp = await clientSrv.getClientById(id);
        if (srvResp.hasError)
            return res
            .status(404)
            .send(Response.constructResponseErrModel(srvResp.error.code || 404, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
    
    app.post('/user', async (req, res) => {
        const srvResp = await clientSrv.createClient(req.body);
        if (srvResp.hasError)
            return res
            .status(409)
            .send(Response.constructResponseErrModel(srvResp.error.code || 409, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
    
    app.delete('/user/:id', async (req, res) => {
        const {id} = req.params;
        const srvResp = await clientSrv.deleteClient(id);
        if (srvResp.hasError)
            return res
            .status(404)
            .send(Response.constructResponseErrModel(srvResp.error.code || 404, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
    
    app.put('/user/:id', async (req, res) => {
        const {id} = req.params;
        const srvResp = await clientSrv.updateClient(id, req.body);
        if (srvResp.hasError)
            return res
            .status(404)
            .send(Response.constructResponseErrModel(srvResp.error.code || 404, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
};

