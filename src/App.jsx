import React, { useCallback, useEffect, useState } from 'react';
import { Answers } from './components/Answers/Answers';
import { Header } from './components/Header/Header';
import { Flag } from './components/Flag/Flag';
import { Footer } from './components/Footer/Footer';
import { Content } from './components/Content/Content';
import { Input } from './components/Input/Input';
import { Statistics } from './components/Statistics/Statistics';
import { CODE, END_TIME } from './constant/keys';
import './App.css';
import { getInfo } from './service';
import { isFinished } from './util/isFinished';

export const App = () => {
  const [curCounties, setCurCountries] = useState(['FR', 'NL', 'BZ', 'BE', 'CN', 'DE']);
  const [code, setCode] = useState('DE');
  const finishedStatus = isFinished(curCounties, code);
  const showStatistic = () => {};

  const init = useCallback(() => {
    // Read cache in localStorage first
    const codeFromLocalStorage = localStorage.getItem(CODE);
    if (codeFromLocalStorage && localStorage.getItem(END_TIME) > Date.now()) {
      setCode(codeFromLocalStorage);
      return;
    }
    // If no cache available, send request.
    getInfo().then((res) => {
      const {
        code: resCode,
        endTime,
      } = res.data;
      setCode(resCode);
      // store into localStorage as cache.
      window.localStorage.setItem(CODE, resCode);
      window.localStorage.setItem(END_TIME, endTime);
    }).catch((err) => {
      // TODO: cache err and call Ralf.
    });
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (finishedStatus) {
      showStatistic();
    }
  }, [finishedStatus]);

  return (
    <div className="App">
      <Header code={code} />
      <Content>
        <Flag code={code}/>
        <Answers countries={curCounties} answer={code}/>
        <Input countries={curCounties} setCountries={setCurCountries} code={code} />
      </Content>
      <Footer />
      <Statistics countries={curCounties} answer={code} />
    </div>
  );
}
