import { Answers } from './components/Answers';
import { Header } from './components/Header';
import { Flag } from './components/Flag';
import { Footer } from './components/Footer';
import { Content } from './components/Content';
import { Input } from './components/Input';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <Content>
        <Flag />
        <Answers />
        <Input />
      </Content>
      <Footer />
    </div>
  );
}
