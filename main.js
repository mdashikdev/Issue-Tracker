document.getElementById('issueInputForm').addEventListener('submit', submitIssue);



const issueCount=()=>{
  const issueCount=document.getElementById('issueCount')
  const getItem=JSON.parse(localStorage.getItem('issues'));
  
  const getClosedItem= getItem.filter((res)=>{
    return res.status === 'Closed'
  })
  if (getItem.length > 0) {
    issueCount.innerText=`${getClosedItem.length} (${getItem.length})`;
  }

}

issueCount()

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  issueCount();
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  issueCount()
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const findIssue= ()=>{
    const find=issues.filter((a)=>{
      return a.id != id
    })
    return find;
  }

  const remainingIssues=findIssue();
  localStorage.setItem('issues',JSON.stringify(remainingIssues));
  fetchIssues()
  issueCount()
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              ${status === 'Closed' ? `<del><h3> ${description} </h3></del>` : `<h3> ${description} </h3>` }
                              
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
