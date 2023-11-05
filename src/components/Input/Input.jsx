import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import { countries } from '../../constant/countries';
import { sendLog } from '../../util/log';
import { isFinished, isSucceed } from '../../util/isFinished';
import { Finished } from './Finished';

export const Input = ({ codeList, setCodeList, answer }) => {
  const [inputCountry, setInputCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // To indicate autoComplete dropdown status
  const finishedStatus = isFinished(codeList, answer);
  const onSelectCountry = (_, value) => {
    setInputCountry(value);
  };
  const onSubmit = () => {
    inputCountry && codeList.length < 6 && setCodeList([...codeList, inputCountry.code]);
    setInputCountry(null);
    sendLog({
      code: inputCountry.code,
      time: Date.now(),
      answer,
    });
  };

  // Press enter again to submit after selecting an option to input.
  const onInputSubmit = (e) => {
    if (e.key === 'Enter' && !isOpen) {
      e.preventDefault();
      onSubmit();
      return false;
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{ mt: '20px', display: 'flex', alignItems: 'center' }}
    >
      {
        finishedStatus ? (
          <Finished isSucceed={isSucceed(codeList, answer)} />
        ) : (
          <>
            <Autocomplete
              popupIcon={null}
              id="combo-box-demo"
              options={countries.map(e => ({ code: e.code, label: e.name }))}
              openOnFocus={false}
              onChange={onSelectCountry}
              onKeyDown={onInputSubmit}
              autoHighlight
              value={inputCountry}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              getOptionDisabled={(option) => codeList.some(e => e === option.code)}
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              renderInput={(params) => (
                <InputBase
                  ref={params.InputProps.ref}
                  type="text"
                  sx={{ p: '0 16px', height: '50px' }}
                  fullWidth
                  inputProps={params.inputProps}
                />
              )}
              sx={{ flexGrow: 1, m: '-4px 0' }}
            />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={onSubmit}>
              <SendIcon />
            </IconButton>
          </>
        )
      }
    </Paper>
  )
};
