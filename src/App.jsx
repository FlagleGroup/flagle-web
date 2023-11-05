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
import { readAll } from './util/db';

export const App = () => {
  const [curCounties, setCurCountries] = useState([]);
  const [code, setCode] = useState();
  const finishedStatus = isFinished(curCounties, code);
  const [openStatistic, setOpenStatistic] = useState(false);
  const showStatistic = () => {
    setOpenStatistic(true);
  };

  const initCode = useCallback(() => {
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
  }, [setCode]);

  const initCurCounties = useCallback(() => {
    readAll().then((res) => {
      const todayStartTime = new Date(new Date().toISOString().slice(0, 10)).getTime();
      const countries = [];
      while (res.length > 0 && res[res.length - 1].time > todayStartTime) {
        const codeItem = res.pop();
        countries.unshift(codeItem.code);
        if (countries.length >= 6) {
          break;
        }
      }
      setCurCountries(countries);
    });
  }, []);

  useEffect(() => {
    initCode();
    initCurCounties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (finishedStatus) {
      showStatistic();
    }
  }, [finishedStatus]);

  return (
    <div className="App">
      <Header code={code} showStatisticModal={showStatistic} />
      <Content>
        <Flag code={code} />
        <Answers countries={curCounties} answer={code} />
        <Input countries={curCounties} setCountries={setCurCountries} code={code} />
      </Content>
      <Footer />
      {
        openStatistic && (<Statistics open={openStatistic} countries={curCounties} answer={code} />)
      }
    </div>
  );
}
