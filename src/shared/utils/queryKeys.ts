const REQ_KEYS = {
  getAuth: '/auth/login',
  getAuthRefresh: '/auth/token/refresh',
  getUser: '/auth/users/me',
  getUsers: '/auth/admin_user_info',
  getUserById: '/auth/admin_info',

  getAllUser: '/auth/admin_user_info',

  getSpotQuestions: '/basic_answers/object/all',
  getSpotQuestionById: '/get_question/object',
  deleteSpotQuestion: '/basic_answers/object',
  addEditSpotQuestion: '/basic_answer/object',

  getInteriorQuestions: '/basic_answers/design/all',
  getInteriorQuestionById: '/get_question/design',
  deleteInteriorQuestion: '/basic_answers/design',
  addEditInteriorQuestion: '/basic_answer/design',

  uploadImage: '/admin/upload',
}

const QUERY_KEYS = {
  USER: 'user',
  USERS: 'users',
  SPOT: 'spot',
  SPOT_ID: 'spot_id',
  SPOT_QUESTIONS: 'spot_questions',
  SPOT_QUESTION_ID: 'spot_question_id',
  INTERIOR_QUESTIONS: 'interior_questions',
  INTERIOR_QUESTION_ID: 'interior_question_id',
  UPLOAD_IMAGE: "images"
}

export { REQ_KEYS, QUERY_KEYS }
