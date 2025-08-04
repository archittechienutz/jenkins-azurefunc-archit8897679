pipeline {
    agent any
    environment {
        AZURE_CLIENT_ID     = credentials('AZURE_CLIENT_ID')
        AZURE_CLIENT_SECRET = credentials('AZURE_CLIENT_SECRET')
        AZURE_TENANT_ID     = credentials('AZURE_TENANT_ID')
        FUNCTION_APP_NAME   = credentials('FUNCTION_APP_NAME')
        RESOURCE_GROUP      = credentials('RESOURCE_GROUP')
    }
    stages {
        stage('Build') {
            steps {
                dir('MyFuncApp') {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('MyFuncApp') {
                    echo 'Running tests...'
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('MyFuncApp') {
                    echo 'Deploying to Azure...'
                    sh """
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                        zip -r function.zip .
                        az functionapp deployment source config-zip \
                          --resource-group $RESOURCE_GROUP \
                          --name $FUNCTION_APP_NAME \
                          --src function.zip
                    """
                }
            }
        }
    }
}
