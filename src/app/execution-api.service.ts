import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ExecutionApiService {

  constructor(private http: HttpClient) {
  }

  startExecution(body: StartExecutionBody) {
    return this.http.post("@executor-api/v1/execution/start", body, { observe: "response" });
  }
}


interface StartExecutionBody {
  scenarioId: string;
  executionOptions: {
    "ramp-up"?: number
    concurrency: number
    "hold-for"?: number
    steps?: number
    iterations?: number
    throughput?: number
  };
}
