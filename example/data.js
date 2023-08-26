const fcnMsgArry = [
  {
    fcnCd: 'G1.AccountManage',
    fcnNm: 'AccountManage',
    lvl: '1',
    parentId: '',
    tplMsg: [],
    children: [
      {
        fcnCd: 'G2.AccountContractManage',
        fcnNm: 'AccountContractManage',
        lvl: '2',
        parentId: 'G1.AccountManage',
        tplMsg: [],
        children: [
          {
            fcnCd: 'F.AccountGroupSettings',
            fcnNm: 'AccountGroupSettings',
            lvl: '3',
            parentId: 'G2.AccountContractManage',
            acctMsg: [
              {
                acctCd: '8388383838389',
                acctNm: 'Test data 2023826',
              },
            ],
            tplMsg: [
              {
                tplNo: 'pmc832920-12123013213',
                tplNm: 'Sabrinayh5y test template 8',
              },
            ],
          },
        ],
      },
    ],
  },
]