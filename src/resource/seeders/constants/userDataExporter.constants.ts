import { Injectable } from "@nestjs/common";
import { AuthenticationService } from "src/controllers/authentication/authentication.service";
import { CreateUser } from "../interfaces/createUser.interfaces";

@Injectable()
export default class UserDataExporter {

    async getUsersData(authenticationService: AuthenticationService, postData: Array<CreateUser>) {
        const password = await authenticationService.hashPassword(process.env.PASSWORD_DEFAULT);
        const allUserFullCredentials = [];
        for (let index = 0; index < postData.length; index++) allUserFullCredentials.push({
            ...postData[index],
            password: await authenticationService.hashPassword(postData[index].password)
        });
        return [
            ...allUserFullCredentials,
            { id: '6e4f00bc-dd23-4931-9516-571165852189', isState: true, name: 'Jonathan', lastName: 'Rubio', nickName: 'jonathanRubio', email: 'jonathanRubio@gmail.com', password },
            { id: '29c83181-4651-4350-ad81-8e3d87aab874', isState: true, name: 'Elis', lastName: 'Pineda', nickName: 'ElisPineda', email: 'ElisPineda@gmail.com', password },
            { id: '3b9e2ab0-4d42-427d-9556-94d480ffe38f', isState: true, name: 'Fabio', lastName: 'Guerrero', nickName: 'Guerrero', email: 'Guerrero@gmail.com', password },
            { id: 'cd7ba5d0-0f5b-42dc-9419-0f70e2d05d08', isState: true, name: 'Jhoan', lastName: 'Cardozo', nickName: 'JhoanCardozo', email: 'JhoanCardozo@gmail.com', password },
            { id: '8b89ee6d-22fe-4524-9b7b-a0a11d873a30', isState: true, name: 'Dayron', lastName: 'Figueroa', nickName: 'DayronFigueroa', email: 'DayronFigueroa@gmail.com', password },
            { id: '39f8733e-b841-4cc8-8ffb-6eacad1ec68d', isState: true, name: 'Elberth', lastName: 'Sepulveda', nickName: 'ElberthSepulveda', email: 'ElberthSepulveda@gmail.com', password },
            { id: '1c27fa50-8799-4898-bf42-f9e2c918585a', isState: true, name: 'David', lastName: 'Rozo', nickName: 'DavidRozo', email: 'DavidRozo@gmail.com', password },
        ];
    }
}