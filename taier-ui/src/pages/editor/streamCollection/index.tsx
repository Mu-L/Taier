/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { Scrollable } from '@dtinsight/molecule/esm/components';
import { connect as moleculeConnect } from '@dtinsight/molecule/esm/react';
import molecule from '@dtinsight/molecule';
import type { IEditor } from '@dtinsight/molecule/esm/model';
import { Modal } from 'antd';
import CollectionGuid from './steps';
import taskSaveService from '@/services/taskSaveService';
// TODO 把数据集成的样式和数据同步的样式统一出来
import '../dataSync/index.scss';
import '../dataSync/keymap.scss';
import '../dataSync/preview.scss';
import './index.scss';

const confirm = Modal.confirm;

const propType: any = {
	editor: PropTypes.object,
	toolbar: PropTypes.object,
	console: PropTypes.object,
};
const initialState = {
	showPublish: false,
	showDebug: false,
	notPublish: false,
	runTitle: 'Command/Ctrl + R',
};
type Istate = typeof initialState;

class StreamCollection extends React.Component<IEditor & typeof propType, Istate> {
	state = {
		showPublish: false,
		showDebug: false,
		notPublish: false,
		runTitle: 'Command/Ctrl + R',
	};

	static propTypes = propType;

	saveTask = taskSaveService.save;

	render() {
		const currentTabData = this.props.current?.tab?.data;
		return (
			<Scrollable>
				<div className="ide-editor">
					<div style={{ zIndex: 901 }} className="ide-content">
						<div
							style={{
								width: '100%',
								height: '100%',
								minHeight: '400px',
								position: 'relative',
							}}
						>
							<CollectionGuid
								saveTask={this.saveTask.bind(this)}
								currentPage={currentTabData}
							/>
						</div>
					</div>
				</div>
			</Scrollable>
		);
	}
}

export default moleculeConnect(molecule.editor, StreamCollection);
