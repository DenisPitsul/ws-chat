import styles from './HomePage.module.sass';
import GroupsComponent from '../../components/GroupsComponent';
import ChatComponent from '../../components/ChatComponent';
function HomePage () {
  return (
    <div className={`container ${styles.pageWrapper}`}>
      <div className={styles.pageContainer}>
        <GroupsComponent />
        <ChatComponent />
      </div>
    </div>
  );
}

export default HomePage;
