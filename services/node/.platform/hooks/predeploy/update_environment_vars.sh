#!/bin/sh -x

export APP_SUBDOMAIN_URL=$(aws ssm get-parameter --region eu-west-2  --name "/common/staging/APP_SUBDOMAIN_URL" | jq -r '.Parameter.Value');
export COGNITO_ISSUER_URI=$(aws ssm get-parameter --region eu-west-2 --name "/node/staging/COGNITO_ISSUER_URI" | jq -r '.Parameter.Value');
export COGNITO_USER_POOL_ID=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/common/staging/COGNITO_USER_POOL_ID" | jq -r '.Parameter.Value');
export DATABASE_HOST=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/node/staging/DATABASE_HOST" | jq -r '.Parameter.Value');
export DATABASE_NAME=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/node/staging/DATABASE_NAME" | jq -r '.Parameter.Value');
export DATABASE_PASSWORD=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/node/staging/DATABASE_PASSWORD" | jq -r '.Parameter.Value');
export DATABASE_USER=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/node/staging/DATABASE_USER" | jq -r '.Parameter.Value');
export DOMAIN_URL=$(aws ssm get-parameter --region eu-west-2 --name "/common/staging/DOMAIN_URL" | jq -r '.Parameter.Value');
export EOD_HISTORICAL_DATA_API_KEY=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/node/staging/EOD_HISTORICAL_DATA_API_KEY" | jq -r '.Parameter.Value');
export NODE_ENV=staging
export PORT=3001
export PREMIUM_ENABLED=$(aws ssm get-parameter --region eu-west-2 --name "/common/staging/PREMIUM_ENABLED" | jq -r '.Parameter.Value');
export REGION=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/node/staging/REGION" | jq -r '.Parameter.Value');
export STRIPE_AUTH_SECRET_KEY=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/node/staging/STRIPE_AUTH_SECRET_KEY" | jq -r '.Parameter.Value');
export STRIPE_WEBHOOK_SECRET=$(aws ssm get-parameter --region eu-west-2 --with-decryption --name "/node/staging/STRIPE_WEBHOOK_SECRET" | jq -r '.Parameter.Value');

# mkdir .ebextensions
# touch .ebextensions/options.config
# {
#   printf "option_settings:\n"
#   printf "\taws:elasticbeanstalk:application:environment:\n"
#   printf "\t\tAPP_SUBDOMAIN_URL:%s\n" "$APP_SUBDOMAIN_URL"
#   printf "\t\tCOGNITO_ISSUER_URI:%s\n" "$COGNITO_ISSUER_URI"
#   printf "\t\tCOGNITO_USER_POOL_ID:%s\n" "$COGNITO_USER_POOL_ID"
#   printf "\t\tDATABASE_HOST:%s\n" "$DATABASE_HOST"
#   printf "\t\tDATABASE_NAME:%s\n" "$DATABASE_NAME"
#   printf "\t\tDATABASE_PASSWORD:%s\n" "$DATABASE_PASSWORD"
#   printf "\t\tDATABASE_USER:%s\n" "$DATABASE_USER"
#   printf "\t\tDOMAIN_URL:%s\n" "$DOMAIN_URL"
#   printf "\t\tEOD_HISTORICAL_DATA_API_KEY:%s\n" "$EOD_HISTORICAL_DATA_API_KEY"
#   printf "\t\tNODE_ENV:%s\n" "$NODE_ENV"
#   printf "\t\tPORT:%s\n" "$PORT"
#   printf "\t\tPREMIUM_ENABLED:%s\n" "$PREMIUM_ENABLED"
#   printf "\t\tREGION:%s\n" "$REGION"
#   printf "\t\tSTRIPE_AUTH_SECRET_KEY:%s\n" "$STRIPE_AUTH_SECRET_KEY"
#   printf "\t\tSTRIPE_WEBHOOK_SECRET:%s\n" "$STRIPE_WEBHOOK_SECRET"
# } > .ebextensions/options.config


# {
#   printf "\t\tAPP_SUBDOMAIN_URL:%s\n" "$APP_SUBDOMAIN_URL"
#   printf "\t\tCOGNITO_ISSUER_URI:%s\n" "$COGNITO_ISSUER_URI"
#   printf "\t\tCOGNITO_USER_POOL_ID:%s\n" "$COGNITO_USER_POOL_ID"
#   printf "\t\tDATABASE_HOST:%s\n" "$DATABASE_HOST"
#   printf "\t\tDATABASE_NAME:%s\n" "$DATABASE_NAME"
#   printf "\t\tDATABASE_PASSWORD:%s\n" "$DATABASE_PASSWORD"
#   printf "\t\tDATABASE_USER:%s\n" "$DATABASE_USER"
#   printf "\t\tDOMAIN_URL:%s\n" "$DOMAIN_URL"
#   printf "\t\tEOD_HISTORICAL_DATA_API_KEY:%s\n" "$EOD_HISTORICAL_DATA_API_KEY"
#   printf "\t\tNODE_ENV:%s\n" "$NODE_ENV"
#   printf "\t\tPORT:%s\n" "$PORT"
#   printf "\t\tPREMIUM_ENABLED:%s\n" "$PREMIUM_ENABLED"
#   printf "\t\tREGION:%s\n" "$REGION"
#   printf "\t\tSTRIPE_AUTH_SECRET_KEY:%s\n" "$STRIPE_AUTH_SECRET_KEY"
#   printf "\t\tSTRIPE_WEBHOOK_SECRET:%s\n" "$STRIPE_WEBHOOK_SECRET"
# } >> /etc/environment

touch .env
{
  printf "\t\tAPP_SUBDOMAIN_URL:%s\n" "$APP_SUBDOMAIN_URL"
  printf "\t\tCOGNITO_ISSUER_URI:%s\n" "$COGNITO_ISSUER_URI"
  printf "\t\tCOGNITO_USER_POOL_ID:%s\n" "$COGNITO_USER_POOL_ID"
  printf "\t\tDATABASE_HOST:%s\n" "$DATABASE_HOST"
  printf "\t\tDATABASE_NAME:%s\n" "$DATABASE_NAME"
  printf "\t\tDATABASE_PASSWORD:%s\n" "$DATABASE_PASSWORD"
  printf "\t\tDATABASE_USER:%s\n" "$DATABASE_USER"
  printf "\t\tDOMAIN_URL:%s\n" "$DOMAIN_URL"
  printf "\t\tEOD_HISTORICAL_DATA_API_KEY:%s\n" "$EOD_HISTORICAL_DATA_API_KEY"
  printf "\t\tNODE_ENV:%s\n" "$NODE_ENV"
  printf "\t\tPORT:%s\n" "$PORT"
  printf "\t\tPREMIUM_ENABLED:%s\n" "$PREMIUM_ENABLED"
  printf "\t\tREGION:%s\n" "$REGION"
  printf "\t\tSTRIPE_AUTH_SECRET_KEY:%s\n" "$STRIPE_AUTH_SECRET_KEY"
  printf "\t\tSTRIPE_WEBHOOK_SECRET:%s\n" "$STRIPE_WEBHOOK_SECRET"
} > .env
ls -lia
cat .env
