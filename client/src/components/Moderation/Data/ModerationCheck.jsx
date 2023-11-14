import {getReport} from '../../Utils/requests';

export default function ModerationCheck({contentID, userID}){
    const report = getReport(contentID);
    if(report != null) {
        if (report.getGloballyHidden())
        {
            
        }
        for (reporter in report.getReporters()) {
            if (userID == reporter) {

            }
        }
    }
}