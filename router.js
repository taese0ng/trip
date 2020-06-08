// global (로그인 안하고도)
const JOIN = '/join'    // 📗
const LOGIN = '/login'  // 📗

// user (로그인 하고나서)
// api -> user ->
const SELECT_TENDENCY = '/select-tendency' // 📗
const USER_DETAIL = '/:id' // 함수로 조지자 📗
const EDIT_PROFILE = '/edit-profile' // 📗
const CHANGE_PASSWORD = '/change-password' // 📗

// 여행 정보 관련
// api -> itin ->
const UPLOAD_ITINERARY = '/upload' // 📗
const ITINERARY_DETAIL = '/:id' // 📗
const EDIT_ITINERARY = '/:id/edit' // 📗
const DELETE_ITINERARY = '/:id/delete' // 📗

// comment
const POST_COMMENT = "/content/:id/comment"
const DELETE_COMMENT = "/api/comment/:id/delete"

// content
const CONTENT_DETAIL = "/content/:id"

const routes = {
    join : JOIN,    // 1
    login : LOGIN,
    
    selectTendency : SELECT_TENDENCY,
    userDetail: id => {
        if (id)
            return `/user/${id}`
        return USER_DETAIL
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    

    uploadItinerary : UPLOAD_ITINERARY,
    itineraryDetail : id => {
        if (id)
            return `/itinerary/${id}`
        return ITINERARY_DETAIL
    },
    editItinerary : id => {
        if (id)
            return `/itinerary/${id}/edit`
        return EDIT_ITINERARY
    },
    deleteItinerary : id => {
        if (id)
            return `/itinerary/${id}/delete`
        return DELETE_ITINERARY
    },

    // 댓글
    postComment : POST_COMMENT,
    deleteComment : DELETE_COMMENT,

    // content 등록
    contentDetail : CONTENT_DETAIL,
}

export default routes;