import { ENV_FILE_PATH } from '../file-path.constants'

/**
 * NOTE: This is here to avoid explicitly importing it in every parameters file,
 * making it easier for users to add custom scenarios.
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: ENV_FILE_PATH })

export * from './shimmer-claiming-funds-spreaders-parameters'
