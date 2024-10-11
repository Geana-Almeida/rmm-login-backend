require('dotenv').config();
import {
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
    AdminCreateUserCommand,
    AdminSetUserPasswordCommand,
    AdminUpdateUserAttributesCommand,
    AdminInitiateAuthCommand,
    AdminGetUserCommand,
    NotAuthorizedException,
    UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { HttpException, Injectable } from '@nestjs/common';


const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

const clientConfig: CognitoIdentityProviderClientConfig = { 
    region, 
    credentials: { 
        accessKeyId: accessKey, 
        secretAccessKey: secretKey 
    } 
};

const client = new CognitoIdentityProviderClient(clientConfig);

@Injectable()
export class AuthService {

    
    async createUser(username: string, password:string){
        const createUserCommand = new AdminCreateUserCommand({
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            Username: username,
            TemporaryPassword: password,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: username
                }
            ]
        });

        const setPassword = new AdminSetUserPasswordCommand({
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            Username: username,
            Password: password,
            Permanent: true
        });

        const paramsVerify = new AdminUpdateUserAttributesCommand({
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            Username: username,
            UserAttributes: [
                {
                    Name: 'email_verified',
                    Value: 'true'
                }
            ]
        });

        const response = await client.send(createUserCommand);
        await client.send(setPassword);
        await client.send(paramsVerify);
        return response;
        
    }

    

    async authenticateUser(username: string, password: string) {
        const command = new AdminInitiateAuthCommand({
            AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password
            }       
        });

        try {
            const response = await client.send(command);

            console.log("Deu certo o refresh :)")
            
            return response.AuthenticationResult;
        } 
        catch (error) {
            throw new HttpException('Usuario não encontrado!', 404);
        }
    }
}