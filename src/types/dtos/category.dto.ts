
type CategoryDTO={
    _id:string,
    imageId:string,
    name:string
}

type CreateCategoryDTO=Omit<CategoryDTO,'_id'>