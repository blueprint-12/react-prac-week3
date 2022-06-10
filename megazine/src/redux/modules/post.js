// user.js

// Actions
const LOAD = "post/LOAD";
const CREATE = "post/CREATE";
const UPDATE = "post/UPDATE";
const DELETE = "post/DELETE";

const initialState = {
  list: [
    {
      content: "테스트1",
      image_url:
        "https://www.comfortzone.com/-/media/Images/ComfortZone-NA/US/Blog/what-sounds-do-happy-cats-make.jpg?h=636&la=en&w=1000&hash=2F0BB9450E4AE626B574D3FF7EC54A51A4872C94",
    },
    {
      content: "테스트2",
      image_url:
        "https://www.comfortzone.com/-/media/Images/ComfortZone-NA/US/Blog/what-sounds-do-happy-cats-make.jpg?h=636&la=en&w=1000&hash=2F0BB9450E4AE626B574D3FF7EC54A51A4872C94",
    },
    {
      content: "테스트3",
      image_url:
        "https://www.comfortzone.com/-/media/Images/ComfortZone-NA/US/Blog/what-sounds-do-happy-cats-make.jpg?h=636&la=en&w=1000&hash=2F0BB9450E4AE626B574D3FF7EC54A51A4872C94",
    },
  ],
};

// Action Creators
export function loadPost() {
  return { type: LOAD };
}

export function createPost(new_post) {
  return { type: CREATE, new_post };
}

export function updatePost(post) {
  return { type: UPDATE, post };
}

export function deletePost(post_index) {
  return { type: DELETE, post_index };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "post/CREATE": {
      const new_post_list = [...state.list, action.new_post];
      return { list: new_post_list };
    }
    default:
      return state;
  }
}
