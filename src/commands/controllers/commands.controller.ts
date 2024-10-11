import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CommandsService } from "../services/commands.service";
import { JwtAuthGuard } from "src/auth/jwt/jwt.auth.guard";

@Controller("command")
export class CommandsController{

    constructor(private readonly commandsQueued: CommandsService){}

    @UseGuards(JwtAuthGuard)
    @Post("add-command")
    addCommand(
    @Body("action") action: string, 
    @Body("params") params: any,
    
){
        const newCommand = this.commandsQueued.addCommand(action, params);
        return newCommand; 
    }

    @UseGuards(JwtAuthGuard)
    @Get("next-command")
    getNextCommand(){
        return this.commandsQueued.getNextCommand();
    }
}