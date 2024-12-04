export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}

export interface QueryParams {
  text: string;
  params?: (string | number | boolean | undefined)[];
}
