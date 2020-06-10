const list = [
  {
    field: 'name',
    options: [
      {
        text: '是',
        value: 1,
      },
      {
        text: '否',
        value: 2,
      },
    ],
    label: '你是否使用柔派2作为日常手机使用？',
    type: 'radio',
  },
  {
    field: 'age',
    options: [
      {
        text: '很棒',
        value: 1,
      },
      {
        text: '还行',
        value: 2,
      },
      {
        text: '不好',
        value: 3,
      },
    ],
    label: '柔派2给你的感觉怎么样？',
    type: 'radio',
  },
  {
    field: 'description',
    label: '你对柔派2有什么改进建议？',
    type: 'textarea',
  },
];

export default list;
