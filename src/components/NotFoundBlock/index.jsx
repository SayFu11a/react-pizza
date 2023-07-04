import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожалению данная старница отсутсвует в наше интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
