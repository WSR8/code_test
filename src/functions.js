import axios from 'axios';

var Tasks = [{
    id: 0,
    priority: 3,
    name: `第0个任务`,
    Info: '无',
    location: '', 
    selected: false,
  },
  {
    id: 1,
    priority: 3,
    name: `第1个任务`,
    Info: '无',
    location: '', 
    selected: false,
  },
  {
    id: 2,
    priority: 3,
    name: `第2个任务`,
    Info: '无',
    location: '', 
    selected: false,
  }]

export default {
    handleAdd() {
        let len = Tasks.length;
        let newTask = {
          id: Tasks.length,
          priority: 3,
          name: `第${Tasks.length}个任务`,
          Info: '无',
          location: '', 
          selected: false,
        }
        let task = [...Tasks, newTask];
        if(task.length == len + 1)
            return true;
        else 
            return false;
    },

    handleDelete(x) {
        let task = Tasks;
        let len = task.length;
        task.splice(x, 1);
        for(let i = x; i < task.length; i++)
        {
          task[i].id = task[i].id - 1;
        }
        if(x < task.length)
        {
            if(task.length == len - 1)
                return true;
            else
                return false;
        }
        else
        {
            if(task.length == len)
                return true;
            else 
                return false;
        }
    },

    SwapTask(t1, t2) {
        let task = Tasks;
        let t_id = task[t1].id, t_priority = task[t1].priority, 
        t_name = task[t1].name, t_Info = task[t1].Info,
        t_location = task[t1].location, t_selected = task[t1].selected;
        task[t1].id = task[t2].id;
        task[t1].priority = task[t2].priority;
        task[t1].name = task[t2].name;
        task[t1].Info = task[t2].Info;
        task[t1].location = task[t2].location;
        task[t1].selected = task[t2].selected;
        task[t2].id = t_id;
        task[t2].priority = t_priority;
        task[t2].name = t_name;
        task[t2].Info = t_Info;
        task[t2].location = t_location;
        task[t2].selected = t_selected;
    },

    sortPriority() {
        let task = Tasks;
        for(let i = 0; i < task.length; i++)
        {
            for(let j = 0; j < task.length - i - 1; j++)
            {
            if(task[j].priority > task[j+1].priority)
                SwapTask(j, j + 1);
            }
        }
        
        for(let i = 0; i < task.length - 1; i++)
        {
            if(task[i].priority > task[i+1].priority)
                return false;
        }
        return true;
    },

    handleChangeName(e, val) {
        Tasks[val].name = e;
        return true;
    },

    handleChangeLocation(e, val) {
        Task[val].location = e;
        return true;
    },

    logIn(name, password) {
        return axios.get(`http://39.104.95.136:3001/getdb/?name=${name}&password=${password}`)
            .then(res => res.data);
    },

    uploadData(data) {
        return axios.post('http://39.104.95.136:3001/postdb/', data)
            .then(res => res.data);
    },
    
    /*register(data) {
        return axios.post('http://39.104.95.136:3001/create_user/', {name:'wsr2',password:'123'})
            .then(res => res.data);
    },*/

    dropOnTask(drag_id, target_id)
    {
        let task = Tasks;
        
        let drag_task = task[drag_id];
        task.splice(drag_id, 1);
        for(let i = drag_id; i < task.length; i ++)
        {
        task[i].id -= 1;
        }
        task.splice(target_id, 0, drag_task);
        for(let i = target_id + 1; i < task.length; i ++)
        {
        task[i].id += 1;
        }
        task[target_id].id = target_id;

        for(let i = 0; i < Tasks.length - 1; i++)
        {
            if(task[i].id < task[i+1].id)
                return true;
        }
        return false;
    },

    logOut() {
        Tasks = [];
        if(Tasks.length == 0)
            return true;
        else 
            return false;
    },
  }