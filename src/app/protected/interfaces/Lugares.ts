// Generated by https://quicktype.io

export interface Lugares {
  type:     string;
  licence:  string;
  features: Feature[];
}

export interface Feature {
  type:       string;
  properties: Properties;
  bbox:       number[];
  geometry:   Geometry;
}

export interface Geometry {
  type:        string;
  coordinates: Array<Array<number[]> | number>;
}

export interface Properties {
  place_id:     number;
  osm_type:     string;
  osm_id:       number;
  display_name: string;
  place_rank:   number;
  category:     string;
  type:         string;
  importance:   number;
  icon?:        string;
  address:      { [key: string]: string };
}