WITH inserted AS (
    INSERT INTO public.answers(answer, question_id)
	VALUES ($/answer/, $/qid/)
	RETURNING *
)
SELECT inserted.*, public.questions.type, public.questions.content
FROM inserted
INNER JOIN questions ON inserted.question_id = questions.id;