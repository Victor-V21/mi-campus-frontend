export interface PublicationImage {
  id: string;
  images: Array<{
    fileName: string;
    url: string;           
    dateUpload?: string;
  }>

}
export interface Publication {
  id: string;
  userId: string;
  userName: string;
  typeId: string;
  typeName: string;
  title: string;
  text: string;
  dateCreate?: string;   
  dateModify?: string;
  images: PublicationImage[];
}

export interface PublicationCreateModel {
  userId: string; 
  typeId: string;
  title: string;
  text: string;
  dateCreate?: string; 
}

export interface PublicationEditModel {
  id: string;
  typeId: string;
  title: string;
  text: string;
  dateCreate?: string;
}


export interface PublicationModel {
  title: string;
  text: string;
  typeId: string;
}
