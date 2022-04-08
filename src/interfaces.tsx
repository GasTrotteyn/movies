export interface Movie {
	titulo?: string
	año?: string
	director?: string
	genero?: string
	actores?: string
	message?: string
}
export interface Document extends File {
	lastModifiedDate?: Date
}
