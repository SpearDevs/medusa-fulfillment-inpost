import { Router } from 'express';
import cors from 'cors';
import { ConfigModule, authenticate } from '@medusajs/medusa';
import bodyParser from 'body-parser';
import InpostFulfillmentService from '../../../services/inpost-fulfillment';

export default function adminRoutes(
  router: Router,
  options: ConfigModule
) {
  const adminRouter = Router();

  adminRouter.use(authenticate());

  router.use('/admin/inpost', adminRouter);
  router.use(bodyParser.json());

  const { projectConfig } = options;

  const corsOptions = {
    origin: projectConfig.admin_cors.split(','),
    credentials: true,
  }


  adminRouter.options('/', cors(corsOptions));

  adminRouter.get('', cors(corsOptions), async (req, res) => {
    const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
      'inpostFulfillmentService'
    );

    return res.json(await inpostFulfillmentService.getFulfillmentOptions());
  });

  adminRouter.get('/points', cors(corsOptions), async (req, res) => {
    const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
      'inpostFulfillmentService'
    );

    return res.json(await inpostFulfillmentService.getPoints());
  });

  adminRouter.get('/points/:point_id', cors(corsOptions), async (req, res) => {
    const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
      'inpostFulfillmentService'
    );

    const { point_id } = req.params;

    return res.json(await inpostFulfillmentService.getPoint(point_id));
  });

  adminRouter.get('/shipments', cors(corsOptions), async (req, res) => {
    const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
      'inpostFulfillmentService'
    );

    return res.json(await inpostFulfillmentService.getShipments());
  });

  adminRouter.get('/shipments/:shipment_id', cors(corsOptions), async (req, res) => {
    const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
      'inpostFulfillmentService'
    );

    const { shipment_id } = req.params;

    return res.json(await inpostFulfillmentService.getShipment(shipment_id));
  });

  adminRouter.post('/shipments', bodyParser.raw({ type: 'application/json' }), cors(corsOptions), async (req, res) => {
    const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
      'inpostFulfillmentService'
    );

    const data = req.body;

    return res.json(await inpostFulfillmentService.createShipment(data));
  });

  adminRouter.put('/shipments/:shipment_id', bodyParser.raw({ type: 'application/json' }), cors(corsOptions), async (req, res) => {
    const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
      'inpostFulfillmentService'
    );

    const { shipment_id } = req.params;

    const data = req.body;

    return res.json(await inpostFulfillmentService.updateShipment(shipment_id, data));
  });

  adminRouter.delete('/shipments/:shipment_id', cors(corsOptions), async (req, res) => {
    const inpostFulfillmentService: InpostFulfillmentService = req.scope.resolve(
      'inpostFulfillmentService'
    );

    const { shipment_id } = req.params;

    return res.json(await inpostFulfillmentService.cancelShipment(shipment_id));
  });

  return adminRouter;
}
