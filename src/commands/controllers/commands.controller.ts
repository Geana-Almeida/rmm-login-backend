import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CommandsService } from "../services/commands.service";
import { JwtAuthGuard } from "src/auth/jwt/jwt.auth.guard";

@Controller("command")
export class CommandsController{

    constructor(private readonly commandsQueued: CommandsService){}

    @UseGuards(JwtAuthGuard)
    @Post("add-command")
    async addCommand(
    @Body("action") action: string, 
    @Body("params") params: any,
    @Body("machineId") machineId: string
){
        const newCommand = await this.commandsQueued.addCommand(action, params, machineId);
        return newCommand; 
    }

    @UseGuards(JwtAuthGuard)
    @Get("next-response")
    async getNextResponse(){
        return await this.commandsQueued.getResponseCommand();
    }
}