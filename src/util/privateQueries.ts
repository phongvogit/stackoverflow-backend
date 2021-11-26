export const userStatistics = [
  {
    $facet: {
      posts: [
        {
          $lookup: {
            from: 'questions',
            let: { userId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$$userId', '$author'] }],
                  },
                },
              },
            ],
            as: 'question_doc',
          },
        },
      ],
      answers: [
        {
          $lookup: {
            from: 'questions',
            let: { userId: '$_id' },
            pipeline: [
              {
                $unwind: {
                  path: '$answers',
                },
              },
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$$userId', '$author'] }],
                  },
                },
              },
            ],
            as: 'answer_doc',
          },
        },
      ],
      comments: [
        {
          $lookup: {
            from: 'questions',
            let: { userId: '$_id' },
            pipeline: [
              {
                $unwind: {
                  path: '$comments',
                },
              },
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$$userId', '$author'] }],
                  },
                },
              },
            ],
            as: 'commentInQuestions_doc',
          },
        },

        {
          $lookup: {
            from: 'questions',
            let: { userId: '$_id' },
            pipeline: [
              {
                $unwind: {
                  path: '$answers',
                },
              },
              {
                $unwind: {
                  path: '$answers.comments',
                },
              },
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$$userId', '$author'] }],
                  },
                },
              },
            ],
            as: 'commentInAnswers_doc',
          },
        },
      ],
      tags: [
        {
          $lookup: {
            from: 'questions',
            let: { userId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$$userId', '$author'] }],
                  },
                },
              },
              {
                $unwind: {
                  path: '$tags',
                },
              },

              { $group: { _id: '$tags', count: { $sum: 1 } } },
            ],
            as: 'tags_doc',
          },
        },
      ],
    },
  },
]
