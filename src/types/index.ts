export type ReactChildrenType = {
  window?: () => Window;
  children?: React.ReactElement;
};

export type PlacesDataType = {
  id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
};

export type UserDataType = {
  id: string;
  name: string;
  image: string;
  places: PlacesDataType[];
};

export type ModalProps = ReactChildrenType & {
  CustomButton: React.ReactElement;
  title: string;
  open: boolean;
  handleClose: () => void;
  Actions?: React.ReactElement;
  maxWidth?: "xl" | "lg" | "md" | "sm" | "xs";
};

export type MapProps = {
  zoom: number;
  center: {
    lat: number;
    lng: number;
  };
  locationName: string;
  setNewPosition?: (pos: { lat: number; lng: number }) => void;
};

export type FormData = {
  title: string;
  description: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  image?: string;
  creator?: string;
};

export type AuthFormData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
export type RegisterInputType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type LoginInputType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export interface IUser {
  email: string;
  name: string;
  id: string;
  family: string;
  _id?:string
}

export interface IGenericResponse {
  status: string;
  message: string;
}
