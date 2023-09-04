import React, { useCallback, useEffect, useState } from 'react';
import { Answers } from './components/Answers';
import { Header } from './components/Header';
import { Flag } from './components/Flag';
import { Footer } from './components/Footer';
import { Content } from './components/Content';
import { Input } from './components/Input';
import { CODE, END_TIME } from './constant/keys';
import './App.css';
import { getInfo } from './service';

export const App = () => {
  const [curCounties, setCurCountries] = useState(['CA']);
  const [code, setCode] = useState('FR');
  const lastCountry = curCounties[curCounties.length -1];
  const isFinished = curCounties.length >= 6 || (lastCountry && lastCountry === code);
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
    if (isFinished) {
      showStatistic();
    }
  }, [isFinished]);

  return (
    <div className="App">
      <Header code={code} />
      <Content>
        <Flag />
        <Answers countries={curCounties} />
        <Input countries={curCounties} setCountries={setCurCountries} />
      </Content>
      <Footer />
    </div>
  );
}
