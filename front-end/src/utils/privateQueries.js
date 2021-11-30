const userStatistics = [
	{
		$match: { username: 'ducphong5' },
	},
	{
		$facet: {
			posts: [
				{
					$lookup: {
						from: 'questions',
						let: { user_id: '$_id' },
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [{ $eq: ['$$user_id', '$author'] }],
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
						let: { user_id: '$_id' },
						pipeline: [
							{
								$unwind: {
									path: '$answers',
								},
							},
							{
								$match: {
									$expr: {
										$and: [{ $eq: ['$$user_id', '$author'] }],
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
						let: { user_id: '$_id' },
						pipeline: [
							{
								$unwind: {
									path: '$comments',
								},
							},
							{
								$match: {
									$expr: {
										$and: [{ $eq: ['$$user_id', '$author'] }],
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
						let: { user_id: '$_id' },
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
										$and: [{ $eq: ['$$user_id', '$author'] }],
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
						let: { user_id: '$_id' },
						pipeline: [
							{
								$unwind: {
									path: '$tags',
								},
							},
							{ $group: { _id: '$tags', count: { $sum: 1 } } },
						],
						as: 'commentInQuestions_doc',
					},
				},
			],
		},
	},
];
