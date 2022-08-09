import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios/index';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false);
  const [selectedFields, setFields] = React.useState({
    title: '',
    text: '',
    tags: '',
    imageUrl: '',
  });
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setFields({
            title: data.title,
            text: data.text,
            imageUrl: data.imageUrl,
            tags: data.tags.join(','),
          });
        })
        .catch((error) => {
          console.warn(error);
          alert('failed to retrieve article');
        });
    }
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setFields({ ...selectedFields, imageUrl: data.url });
    } catch (error) {
      console.log(error);
      alert('failed to upload image');
    }
  };
  const onClickRemoveImage = () => {
    setFields({ ...selectedFields, imageUrl: '' });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        ...selectedFields,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('failed to create article!');
    }
  };

  const onChange = React.useCallback(
    (value) => {
      setFields({
        ...selectedFields,
        text: value,
      });
    },
    [selectedFields],
  );

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter a text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {selectedFields.imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${selectedFields.imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        value={selectedFields.title}
        onChange={(e) =>
          setFields({
            ...selectedFields,
            title: e.target.value,
          })
        }
        variant="standard"
        placeholder="Heading..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        value={selectedFields.tags}
        onChange={(e) =>
          setFields({
            ...selectedFields,
            tags: e.target.value,
          })
        }
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={selectedFields.text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Save' : 'Publish'}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
