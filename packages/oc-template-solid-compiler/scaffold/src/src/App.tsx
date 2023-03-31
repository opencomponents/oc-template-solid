import { createSignal, Show } from 'solid-js';
import { useData } from 'oc-template-solid-compiler/utils/useData';
import styles from './styles.css';
import type { AdditionalData, ClientProps } from './types';

interface AppProps extends ClientProps {
  getMoreData?: boolean;
}

const App = () => {
  const { firstName, lastName, userId, getData, getSetting } =
    useData<AppProps>();
  const staticPath = getSetting('staticPath');
  const [additionalData, setAdditionalData] =
    createSignal<AdditionalData | null>(null);
  const [error, setError] = createSignal('');

  const fetchMoreData = async () => {
    setError('');
    try {
      const data = await getData({ userId, getMoreData: true });
      setAdditionalData(data);
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <Show when={!error()} fallback={<div>Something wrong happened!</div>}>
      <div class={styles.container}>
        <img
          width="50"
          height="50"
          src={`${staticPath}/public/logo.png`}
          alt="Logo"
        />
        <h1 style={{ margin: '0 0 20px 0' }}>
          Hello,{' '}
          <span style={{ textDecoration: 'underline' }}>{firstName}</span>{' '}
          {lastName}
        </h1>
        {additionalData && (
          <div class={styles.info}>
            <div class={styles.block}>Age: {additionalData.age}</div>
            <div class={styles.block}>
              Hobbies: {additionalData.hobbies.map((x) => x.toLowerCase()).join(', ')}
            </div>
          </div>
        )}
        <button class={styles.button} onClick={fetchMoreData}>
          Get extra information
        </button>
      </div>
    </Show>
  );
};

export default App;
