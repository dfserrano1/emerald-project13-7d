import {getReport} from '../../Utils/requests';

export default function ModerationCheck({contentID, userID}){
    const report = getReport(contentID);
    if(report != null) {
        for (report.length())
    }
}