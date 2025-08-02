import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import photoService from "../services/photoService"

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

export const publishPhoto = createAsyncThunk("photo/publish", async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data = await photoService.publishPhoto(photo, token)

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const getPhotosByUser = createAsyncThunk("photos/userphotos", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data = await photoService.getPhotosByUser(id, token)
    return data
})

export const deletePhoto = createAsyncThunk("photo/delete", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data = await photoService.deletePhoto(id, token)

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const updatePhoto = createAsyncThunk("photo/update", async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.updatePhoto(
        { title: photoData.title },
        photoData.id,
        token
    )

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const getPhotoById = createAsyncThunk("photo/get", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data = await photoService.getPhotoById(id, token)
    return data
})

export const like = createAsyncThunk("photo/like", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data = await photoService.like(id, token)

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const comment = createAsyncThunk("photo/comment", async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.comment(
        { comment: commentData.comment },
        commentData.id,
        token
    )

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const getAllPhotos = createAsyncThunk("photos/getall", async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data = await photoService.getAllPhotos(token)
    return data
})

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: state => {
            state.message = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(publishPhoto.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(publishPhoto.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.photo = action.payload
                state.photos.unshift(state.photo)
                state.message = "Foto publicada com sucesso!"
            })
            .addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = {}
            })
            .addCase(getPhotosByUser.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(getPhotosByUser.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.photos = action.payload
            })
            .addCase(deletePhoto.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.photos = state.photos.filter(photo => photo._id !== action.payload.id)
                state.message = action.payload.message
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = {}
            })
            .addCase(updatePhoto.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null

                state.photos.map(photo => {
                    if (photo._id === action.payload.photo._id) {
                        return photo.title = action.payload.photo.title
                    }

                    return photo
                })

                state.message = action.payload.message
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = {}
            })
            .addCase(getPhotoById.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(getPhotoById.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.photo = action.payload
            })
            .addCase(like.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null

                if (state.photo.likes) {
                    state.photo.likes.push(action.payload.userId)
                }

                state.photos.map(photo => {
                    if (photo._id === action.payload.photoId) {
                        return photo.likes.push(action.payload.userId)
                    }

                    return photo
                })

                state.message = action.payload.message
            })
            .addCase(like.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(comment.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.photo.comments.push(action.payload.comment)
                state.message = action.payload.message
            })
            .addCase(comment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getAllPhotos.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(getAllPhotos.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.photos = action.payload
            })
    }
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer