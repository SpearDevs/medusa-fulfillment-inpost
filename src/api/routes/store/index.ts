import { Router } from 'express';
import { 
  ConfigModule, 
} from '@medusajs/medusa/dist/types/global';
import cors from 'cors';
import { wrapHandler } from '@medusajs/medusa';

export default function storeRoutes(
  router: Router,
  options: ConfigModule
) {
  const { projectConfig } = options;

  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(','),
    credentials: true,
  }

  const storeRouter = Router();
  router.use('/store/inpost', storeRouter);

  storeRouter.use(cors(storeCorsOptions));
  
  // list all blog posts
  storeRouter.get(
    '/',
    wrapHandler(async (req, res) => {
// 
  }));
}
