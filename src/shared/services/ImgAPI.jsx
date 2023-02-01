// import axios from 'axios';

// const Images = async (search, page) => {
//   const { data } = await axios.get(
//     `https://pixabay.com/api/?q=${search}&page=${page}&key=31880656-95c2fbbe9581639500b790cae&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   return data;
// };

// export default searchImages;

import axios from 'axios';

const KEY = '31880656-95c2fbbe9581639500b790cae';
const BASE_URL = 'https://pixabay.com/api';

const searchPicts = (search, page) => {
  return axios
    .get(
      `${BASE_URL}/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => response.data);
};

export default searchPicts;
