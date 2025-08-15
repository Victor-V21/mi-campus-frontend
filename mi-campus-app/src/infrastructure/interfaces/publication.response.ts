export interface PublicationImage {
  id: string;
  fileName: string;
  url: string;           // relativo: /images/publications/...
  dateUpload?: string;
}

export interface Publication {
  id: string;
  userId: string;
  userName: string;
  typeId: string;
  typeName: string;
  title: string;
  text: string;
  dateCreate?: string;   // úsalo para la fecha en la tarjeta
  dateModify?: string;
  images: PublicationImage[];
}
