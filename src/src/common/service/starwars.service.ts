import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, lastValueFrom } from "rxjs";
import axios from "axios";
import * as https from "https";

const URL = "https://swapi.dev/api/";

@Injectable()
export class StarwarsService {
  private readonly customHttpService: HttpService;

  constructor(private readonly httpService: HttpService) {
    this.customHttpService = new HttpService(
      axios.create({
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      })
    );
  }

  async getFilms() {
    try {
      console.log(`${URL}films`);
      const response = await firstValueFrom(
        this.customHttpService.get(`${URL}/films`)
      );
      return response?.data;
    } catch (error) {
      throw new Error("Error fetching data: " + error.message);
    }
  }
}
