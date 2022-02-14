/**CMI is data model referenced by SCORM */
export const CMI = {
    core: {
        student_id: 'cmi.core.student_id',
        student_name: 'cmi.core.student_name',
        lesson_location: 'cmi.core.lesson_location',
        lesson_status: 'cmi.core.lesson_status',
        total_time: 'cmi.core.total_time'
    },
    objectives: {
        count: 'cmi.objectives._count',
        children: 'cmi.objectives._children',
        id: (index)=>{
            return `cmi.objectives.${index}.id`;
        },
        score_children: (index)=>{
            return `cmi.objectives.${index}.score._children`;
        },
        score_raw: (index)=>{
            return `cmi.objectives.${index}.score.raw`
        },
        score_max: (index)=>{
            return `cmi.objectives.${index}.score.max`;
        },
        score_min: (index)=>{
            return `cmi.objectives.${index}.score.min`;
        },
        status: (index)=>{
            return `cmi.objectives.${index}.status`;
        }
    }
}