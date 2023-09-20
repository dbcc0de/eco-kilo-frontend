// get industrial and commercial when scaling up

interface Outputs {
  utility_name: string;
  residential: number;
}

export default interface UtilityResponse {
  outputs: Outputs;
}
