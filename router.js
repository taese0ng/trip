// global (로그인 안하고도)
const JOIN = '/join'
const LOGIN = '/login'

// user (로그인 하고나서)
// api -> user ->
const SELECT_TENDENCY = '/select-tendency'
const USER_DETAIL = '/:id' // 함수로 조지자
const EDIT_PROFILE = '/edit-profile'

// 여행 정보 관련
// api -> itin ->
const CREATE_ITINERARY = '/create'
const ITINERARY_DETAIL = '/:id'
const EDIT_ITINERARY = '/:id/edit'
const DELETE_ITINERARY = '/:id/delete'

//희망server 와 통신

const routes = {
    join : JOIN,    // 1
    login : LOGIN,
    
    selectTendency : SELECT_TENDENCY,
    userDetail: id => {
        if (id)
            return `/users/${id}`
        return USER_DETAIL
    },
    editProfile : EDIT_PROFILE,
    

    create : CREATE_ITINERARY,
    itineraryDetail : id => {
        if (id)
            return `/videos/${id}`
        return ITINERARY_DETAIL
    },
    editItinerary : id => {
        if (id)
            return `/videos/${id}/edit`
        return EDIT_ITINERARY
    },
    deleteItinerary : id => {
        if (id)
            return `/videos/${id}/delete`
        return DELETE_ITINERARY
    },
}

export default routes;